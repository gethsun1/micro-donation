import React, { useState } from "react";

const CreatePool = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle pool creation logic here
        console.log({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <div className="container mx-auto mt-12">
            <h1 className="text-2xl font-bold">Create a New Donation Pool</h1>
            <form className="mt-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-2"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-2"
                />
                <button type="submit">Create Pool</button>
            </form>
        </div>
    );
};

export default CreatePool;
