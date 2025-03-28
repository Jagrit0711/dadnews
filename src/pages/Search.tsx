
import React from "react";
import { Layout } from "@/components/Layout";

const Search = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-brutalist mb-6">Search News</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for news..."
            className="w-full p-4 border-2 border-brutalist rounded-brutalist"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-brutalist text-white px-4 py-2 rounded-brutalist">
            Search
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
