export default function Footer() {

    function year() {
        const current = new Date().getFullYear();

        if (current === 2023) {
            return ("2023")
        } else {
            return ("2023 - " + current)
        }
    }

    return (
        <footer>© Mor {year()}</footer>
    )
}