import { useState, useEffect } from "react";

export default function DarkModeToggle() {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const root = document.documentElement;
		if (dark) {
			root.setAttribute("data-theme", "dark");
		} else {
			root.removeAttribute("data-theme");
		}
	}, [dark]);

	return (
		<button
			className="border text-center md:w-40 w-30 py-2 hover:cursor-pointer hover:border-[var(--highlight)]"
			onClick={() => setDark(!dark)}
		>
			{dark ? "White Mode" : "Dark Mode"}
		</button>
	);
}
