// A simple debounce function in TypeScript

export function debounce(
    func: (...args: any[]) => void, // func can take any number of arguments
    delay: number                   // delay in milliseconds
): (...args: any[]) => void {     // returns a function that takes any arguments
    let timer: ReturnType<typeof setTimeout>; // stores the timer id

    return function (...args: any[]) { // ...args collects all arguments into an array
        if (timer) {
            clearTimeout(timer); // cancel the previous timer if it exists
        }
        timer = setTimeout(() => {
            func(...args); // call the original function with all arguments
        }, delay);
    };
}
