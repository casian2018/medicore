import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Listbox } from "@headlessui/react";
// import { ChevronUpDownIcon, CheckIcon } from "@heroicons";
interface ForumPost {
	id: string;
	author: string;
	title: string;
	content: string;
	tags: string[];
	image?: string;
	timestamp: Date;
}

interface User {
	type: string;
}

export default function DoctorForum() {
  
  const [tags] = useState([
    "Neuro",
    "Cardio",
    "Oncology",
    "Pediatrics",
    "Dermatology",
    "Gastroenterology",
    "Endocrinology",
    "Rheumatology",
    "Nephrology",
    "Hematology",
]);

	const [newPost, setNewPost] = useState({
		author: "",
		title: "",
		content: "",
		tags: [] as string[],
		image: "",
	});
	const [posts, setPosts] = useState<ForumPost[]>([]);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		// Fetch user data
		const fetchUser = async () => {
			try {
				const response = await fetch("/api/profile/user");
				const data = await response.json();
				setUser(data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUser();
	}, []);

	const handleSubmitPost = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!newPost.author.trim() ||
			!newPost.title.trim() ||
			!newPost.content.trim() ||
			newPost.tags.length === 0
		)
			return;

		const tempPost = {
			author: newPost.author,
			title: newPost.title,
			content: newPost.content,
			tags: newPost.tags,
			image: newPost.image || "", // Send image name or empty string
		};

		// Send data to API
		try {
			const response = await fetch("/api/forum/addPost", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(tempPost),
			});

			if (response.ok) {
				const data = await response.json();
				setPosts([{ ...data, timestamp: new Date(data.timestamp) }, ...posts]); // Update the posts list with the new post
				setNewPost({ author: "", title: "", content: "", tags: [], image: "" });
			} else {
				const errorData = await response.json();
				console.error(errorData.message);
			}
		} catch (error) {
			console.error("Error submitting post:", error);
		}
	};

	if (user === null) {
		return <div>Loading...</div>;
	}

	if (user.type == "patient") {
		return (
			<main>
				<Nav />
				<div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col justify-center items-center">
					<h1 className="text-3xl font-bold mb-8 text-center text-black">
						Access Denied
					</h1>
					<p className="text-lg text-center text-black mb-4">
						You do not have permission to access this page.
					</p>
					<Link href="/">
						<a className="py-2 px-6 rounded-lg shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-200">
							Go Back to Main
						</a>
					</Link>
				</div>
				<Footer />
			</main>
		);
	}

	return (
		<main>
			<Nav />
			<div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col justify-between">
				<h1 className="text-3xl font-bold mb-8 text-center text-black">
					Medical Discussion Forum
				</h1>

				<div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-red-50">
					<form onSubmit={handleSubmitPost} className="space-y-4">
						<label className="block text-lg font-medium text-black">
							Create a New Post
						</label>

						<input
							value={newPost.author}
							onChange={(e) =>
								setNewPost({ ...newPost, author: e.target.value })
							}
							placeholder="Your Name (e.g., Dr. Smith)"
							className="w-full p-4 rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all"
							required
						/>

						<input
							value={newPost.title}
							onChange={(e) =>
								setNewPost({ ...newPost, title: e.target.value })
							}
							placeholder="Post Title..."
							className="w-full p-4 rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all"
							required
							maxLength={120}
						/>

						<textarea
							value={newPost.content}
							onChange={(e) =>
								setNewPost({ ...newPost, content: e.target.value })
							}
							placeholder="Share your medical insights or ask a question..."
							className="w-full min-h-[120px] p-4 rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all"
							required
							maxLength={1000}
						/>

			<Listbox
				value={newPost.tags}
				onChange={(selectedTags) =>
					setNewPost({
						...newPost,
						tags: selectedTags,
					})
				}
				multiple
			>
				<Listbox.Button className="w-full p-4 rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all">
					{newPost.tags.length === 0
						? "Select Tags"
						: newPost.tags.join(", ")}
				</Listbox.Button>
				<Listbox.Options className="w-full mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
					{tags.map((tag) => (
						<Listbox.Option
							key={tag}
							value={tag}
							className={({ active }) =>
								`${
									active ? "text-white bg-red-600" : "text-gray-900"
								} cursor-default select-none relative py-2 pl-10 pr-4`
							}
						>
							{({ selected }) => (
								<>
									<span
										className={`${
											selected ? "font-medium" : "font-normal"
										} block truncate`}
									>
										{tag}
									</span>
								</>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Listbox>
            

						<input
							type="file"
							accept="image/*"
							onChange={(e) =>
								setNewPost({
									...newPost,
									image: e.target.files?.[0]?.name || "",
								})
							}
							className="w-full p-2 rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all"
						/>

						<div className="flex justify-end gap-4">
							<button
								type="submit"
								className="py-2 px-6 rounded-lg shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
							>
								Post to Forum
							</button>
						</div>
					</form>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
					{posts.map((post) => (
						<Link
							key={post.id}
							href={`/forum/${post.id}`}
							className="block bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-red-50"
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<span className="font-semibold text-black">
											{post.author}
										</span>
										<span className="text-red-500 text-xs px-2 py-1 rounded-full bg-red-50">
											Doctor
										</span>
									</div>
									<h3 className="font-medium text-black mb-2">{post.title}</h3>
									<p className="text-sm text-gray-600 line-clamp-3 mb-2">
										{post.content}
									</p>
									<p className="text-xs text-gray-400">
										Tags: {post.tags.join(", ")}
									</p>
									{post.image && (
										<img
											src={post.image}
											alt="Post image"
											className="w-full h-40 object-cover mt-2 rounded-lg"
										/>
									)}
									<div className="flex items-center justify-between text-xs">
										<span className="text-gray-400">
											{post.timestamp.toLocaleDateString()}
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
			<Footer />
		</main>
	);
}
