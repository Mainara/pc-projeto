const queue = [];

export const addTask = async (task) => {
    queue.push(task);
}

export const getQueue = () => {
    return queue;
}