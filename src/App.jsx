import { useEffect, useState } from "react";
import reload from "./assets/reload.svg";

const API_URL = "https://api.github.com/users/nathan-pham/repos";

const generateRandom = (repos) => Math.floor(Math.random() * repos.length);

const App = () => {
    const [repos, setRepos] = useState([]);
    const [random, setRandom] = useState(0);

    useEffect(() => {
        const fetchRepos = async () => {
            const res = await fetch(API_URL).then((res) => res.json());
            setRandom(generateRandom(res));
            setRepos(res);
        };

        fetchRepos();
    }, []);

    return (
        <main className="h-screen w-screen grid place-items-center">
            <div className="border rounded-lg p-6 shadow-lg max-w-md">
                <h1 className="text-5xl font-bold">📦 Refactor Day</h1>
                <p className="text-lg mt-4 text-slate-600 leading-snug">
                    Pick a random project to refactor! Reload the page or click
                    the button for another one.
                </p>

                <div className="flex items-center justify-between w-full mt-6">
                    <a
                        className="text-lg text-blue-700 underline"
                        target="_blank"
                        rel="noreferer"
                        href={repos[random]?.html_url || "#"}
                    >
                        {repos[random]?.name || "Hang on..."}
                    </a>

                    <img
                        className="cursor-pointer select-none"
                        src={reload}
                        onClick={() => {
                            setRandom(generateRandom(repos));
                        }}
                    />
                </div>
            </div>
        </main>
    );
};

export default App;
