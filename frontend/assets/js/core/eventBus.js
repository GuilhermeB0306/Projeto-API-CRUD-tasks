const listeners = {};

export const EventBus = {
    on(event, fn) {
        (listeners[event] ??= []).push(fn);
    },
    emit(event, payload) {
        (listeners[event] ?? []).forEach(fn => fn(payload));
    },
};