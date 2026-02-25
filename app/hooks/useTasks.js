"use client"
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

import { getTasks, addTask, updateTask, deleteTask } from "../services/taskApi";

export const useTasks = () => {
    return useInfiniteQuery({
        queryKey: ["tasks"],
        queryFn: ({ pageParam = 1 }) => getTasks(pageParam, 10),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.next || undefined,
    });
};

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateTask(id, data),
        onMutate: async (newTodo) => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });
            const previousTasks = queryClient.getQueryData(["tasks"]);

            queryClient.setQueryData(["tasks"], (old) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        data: page.data.map((task) =>
                            task.id === newTodo.id ? { ...task, ...newTodo.data } : task
                        ),
                    })),
                };
            });

            return { previousTasks };
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(["tasks"], context.previousTasks);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};
