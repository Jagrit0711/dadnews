
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter, Newspaper } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockNewsData } from "@/data/mockNewsData";
import { Separator } from "@/components/ui/separator";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(mockNewsData.slice(0, 3));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter mockNewsData based on searchTerm
    const results = mockNewsData.filter(
      news => news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              news.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results.length > 0 ? results : mockNewsData.slice(0, 3));
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-8 px-4 md:px-6">
        <h1 className="text-3xl font-brutalist mb-6">Search News</h1>
        
        <Card className="mb-8 border-2 border-brutalist">
          <CardHeader className="pb-4">
            <CardTitle className="font-brutalist text-xl">Find News Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for news..."
                  className="pl-10 pr-4 py-6 border-2 border-brutalist rounded-brutalist"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" className="flex-1 bg-brutalist text-white font-brutalist hover:bg-brutalist/90">
                  <SearchIcon className="h-5 w-5 mr-2" />
                  Search
                </Button>
                <Button type="button" variant="outline" className="flex-1 font-brutalist">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-brutalist flex items-center">
            <Newspaper className="h-5 w-5 mr-2" />
            {searchResults.length > 0 ? "Search Results" : "Suggested Articles"}
          </h2>
          
          <div className="grid gap-4">
            {searchResults.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow border-2 border-brutalist">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">{article.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{article.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm">{article.summary}</p>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <span className="text-sm text-muted-foreground">News Source</span>
                  <Button variant="outline" size="sm">Read More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {searchResults.length > 5 && (
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More Results</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
