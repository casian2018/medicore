import React from "react";

interface SidebarProps {
    tags: string[];
    selectedTag: string;
    onSelectTag: (tag: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tags, selectedTag, onSelectTag }) => {
    return (
        <div className="w-1/6 p-4 border-r h-screen overflow-y-auto bg-gray-900 text-white">
            <h2 className="text-lg font-semibold mb-4 border-b border-red-500 pb-2">Tags</h2>
            <ul>
                {tags.map((tag) => (
                    <li
                        key={tag}
                        className={`cursor-pointer p-2 rounded-md mb-2 transition-transform transform hover:scale-105 ${
                            selectedTag === tag ? "bg-red-500 text-white" : "bg-gray-700"
                        }`}
                        onClick={() => onSelectTag(tag)}
                    >
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;