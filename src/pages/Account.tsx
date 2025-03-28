
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Settings, Clock, BookOpen, Heart, Coffee } from "lucide-react";

const Account = () => {
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [dadNotifs, setDadNotifs] = useState(true);
  const [newsDigest, setNewsDigest] = useState(false);
  const [dadIntensity, setDadIntensity] = useState(5);

  return (
    <Layout>
      <div className="container max-w-5xl py-8 px-4 md:px-6">
        <h1 className="text-3xl font-brutalist mb-6">My Account</h1>
        
        <div className="bg-card p-4 md:p-6 rounded-brutalist border-2 border-brutalist mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-brutalist">
              <AvatarImage src="https://i.pravatar.cc/150?img=58" alt="User" />
              <AvatarFallback className="bg-brutalist text-white text-2xl">UD</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-brutalist">User Demo</h2>
              <p className="text-muted-foreground">user@example.com</p>
              <Button variant="outline" size="sm" className="mt-2">
                <User className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="preferences" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="preferences" className="font-brutalist">
              <Settings className="h-4 w-4 mr-2" /> Preferences
            </TabsTrigger>
            <TabsTrigger value="reading-history" className="font-brutalist">
              <Clock className="h-4 w-4 mr-2" /> Reading History
            </TabsTrigger>
            <TabsTrigger value="dad-settings" className="font-brutalist">
              <Coffee className="h-4 w-4 mr-2" /> Dad Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="font-brutalist">Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive updates from Dadly News</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dad-notifs">Receive Dad Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow Dad to pop up with news suggestions
                      </p>
                    </div>
                    <Switch 
                      id="dad-notifs" 
                      checked={dadNotifs}
                      onCheckedChange={setDadNotifs}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifs">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive breaking news in your inbox
                      </p>
                    </div>
                    <Switch 
                      id="email-notifs" 
                      checked={emailNotifs}
                      onCheckedChange={setEmailNotifs}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="news-digest">Weekly News Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Get a summary of top stories every Sunday
                      </p>
                    </div>
                    <Switch 
                      id="news-digest" 
                      checked={newsDigest}
                      onCheckedChange={setNewsDigest}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="reading-history">
            <Card>
              <CardHeader>
                <CardTitle className="font-brutalist">Your Reading History</CardTitle>
                <CardDescription>Articles you've read recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-start space-x-4 pb-4 border-b">
                      <BookOpen className="h-5 w-5 mt-1 text-muted-foreground" />
                      <div className="space-y-1">
                        <h3 className="font-medium">You read "Top 10 News Stories This Week"</h3>
                        <p className="text-sm text-muted-foreground">2 days ago · 4 min read</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto">View All History</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="dad-settings">
            <Card>
              <CardHeader>
                <CardTitle className="font-brutalist">Dad Personality Settings</CardTitle>
                <CardDescription>Customize how Dad interacts with you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="dad-intensity">Dad Intensity Level (1-10)</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Chill</span>
                      <Input 
                        id="dad-intensity" 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={dadIntensity} 
                        onChange={(e) => setDadIntensity(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm">Helicopter</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label>Dad Personality Type</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-accent">
                        <input type="radio" id="dad-type-1" name="dad-type" defaultChecked />
                        <label htmlFor="dad-type-1" className="font-medium cursor-pointer">Classic Dad Jokes</label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-accent">
                        <input type="radio" id="dad-type-2" name="dad-type" />
                        <label htmlFor="dad-type-2" className="font-medium cursor-pointer">Serious News Dad</label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-accent">
                        <input type="radio" id="dad-type-3" name="dad-type" />
                        <label htmlFor="dad-type-3" className="font-medium cursor-pointer">Sports Fanatic Dad</label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-accent">
                        <input type="radio" id="dad-type-4" name="dad-type" />
                        <label htmlFor="dad-type-4" className="font-medium cursor-pointer">Tech Enthusiast Dad</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Dad Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Account;
