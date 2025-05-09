export function checkAge(value: string) {
    const now = new Date();
    const birthDate = new Date(value);
    if (now.getFullYear() - birthDate.getFullYear() === 13) {
        if (now.getMonth() > birthDate.getMonth()) {
            return true;
        } else if (now.getMonth() === birthDate.getMonth()) {
            if (now.getDate() >= birthDate.getDate()) {
                return true;
            }
        }
    }
    return now.getFullYear() - birthDate.getFullYear() > 13;
}
