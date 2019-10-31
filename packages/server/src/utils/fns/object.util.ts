export function deleteProps<T extends object>(target: T, props: string[]): T {
    props.forEach(prop => {
        Reflect.deleteProperty(target, prop);
    });

    return target;
}
