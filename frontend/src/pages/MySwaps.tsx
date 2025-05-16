import { useAuth } from '@/stores/useAuth';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, RefreshCw } from "lucide-react";
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

function MySwaps() {
    const { user } = useAuth();

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case "PENDING":
                return (
                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                        <Clock className="w-3 h-3" /> Pending
                    </Badge>
                );
            case "ACCEPTED":
                return (
                    <Badge variant="default" className="flex items-center gap-1 text-xs">
                        <Check className="w-3 h-3" /> Accepted
                    </Badge>
                );
            case "DECLINED":
                return (
                    <Badge variant="destructive" className="flex items-center gap-1 text-xs">
                        <X className="w-3 h-3" /> Declined
                    </Badge>
                );
            case "CANCELED":
                return (
                    <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                        <X className="w-3 h-3" /> Canceled
                    </Badge>
                );
            default:
                return null;
        }
    };


    return (
        <div className="px-4 py-4">
            <Tabs defaultValue="incoming" className="w-full max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="incoming">Incoming Offers</TabsTrigger>
                    <TabsTrigger value="outgoing">Outgoing Offers</TabsTrigger>
                </TabsList>

                <TabsContent value="incoming" className="mt-6">
                    {user?.receivedSwaps?.length === 0 ? (
                        <p className="text-center text-muted-foreground">No incoming offers</p>
                    ) : (
                        <div className="space-y-10 ">
                            {user?.receivedSwaps.map((swap) => (
                                <Card
                                    key={swap.id}
                                    className=" gap-2 p-3 border rounded-lg shadow-sm"
                                >

                                    <div className='flex justify-between w-full'>
                                        <div className="flex items-center gap-2 overflow-auto w-full sm:w-auto">
                                            <div className="flex items-center gap-2 w-full sm:w-[160px]">
                                                <Avatar>
                                                    <AvatarImage src={swap.proposer.image || undefined} />
                                                    <AvatarFallback>
                                                        {swap.proposer.name?.charAt(0)?.toUpperCase() || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="text-xs">
                                                    <p className="font-medium">{swap.proposer.name}</p>
                                                    <p className="text-muted-foreground text-[10px]">sent a swap</p>
                                                </div>
                                            </div>
                                            <div className='border rounded-lg p-3 w-[200px]'>
                                                <Link
                                                    to={`/item/${swap.proposedItem.id}`}
                                                    className="flex items-center gap-2 text-sm hover:underline"
                                                >
                                                    <img
                                                        src={swap.proposedItem.image}
                                                        alt={swap.proposedItem.title}
                                                        className="w-7 h-7 object-cover rounded"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium leading-none">{swap.proposedItem.title}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                            <RefreshCw className="w-3 h-3 text-muted-foreground" />
                                            <div className='border rounded-lg p-3 w-[200px]'>
                                                <Link
                                                    to={`/item/${swap.receiverItem.id}`}
                                                    className="flex items-center gap-2 text-sm hover:underline"
                                                >
                                                    <img
                                                        src={swap.receiverItem.image}
                                                        alt={swap.receiverItem.title}
                                                        className="w-7 h-7 object-cover rounded"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium leading-none">{swap.receiverItem.title}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:items-end gap-2 w-full sm:w-[130px]" >
                                            {renderStatusBadge(swap.status)}

                                            {swap.status === "PENDING" && (
                                                <div className="flex gap-1">
                                                    <Button size="sm" className="h-6 px-2 text-[10px]">
                                                        <Check className="h-3 w-3 mr-1" /> Accept
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="h-6 px-2 text-[10px]"
                                                    >
                                                        <X className="h-3 w-3 mr-1" /> Decline
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                    <Separator />
                                    <div className="bg-muted p-3 rounded-md text-sm">
                                        <h1 className="font-medium mb-1">Message:</h1>
                                        <p className="text-muted-foreground">{swap?.message}</p>
                                    </div>

                                </Card>

                            ))}
                        </div>
                    )
                    }
                </TabsContent >

                <TabsContent value="outgoing" className="mt-6">
                    {user?.proposedSwaps?.length === 0 ? (
                        <p className="text-center text-muted-foreground">No outgoing offers</p>
                    ) : (
                        <div className="space-y-3">
                            {user?.proposedSwaps.map((swap) => (
                                <Card
                                    key={swap.id}
                                    className="gap-2 p-3 border rounded-lg shadow-sm"
                                >
                                    <div className='flex justify-between w-full'>
                                        <div className="flex items-center gap-2 overflow-auto w-full sm:w-auto">

                                            <div className='border rounded-lg p-3 w-[200px]'>
                                                <Link
                                                    to={`/item/${swap.proposedItem.id}`}
                                                    className="flex items-center gap-2 text-sm hover:underline"
                                                >
                                                    <img
                                                        src={swap.proposedItem.image}
                                                        alt={swap.proposedItem.title}
                                                        className="w-7 h-7 object-cover rounded"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium leading-none">{swap.proposedItem.title}</span>
                                                    </div>
                                                </Link>
                                            </div>

                                            <RefreshCw className="w-3 h-3 text-muted-foreground" />

                                            <div className='border rounded-lg p-3 w-[200px]'>
                                                <Link
                                                    to={`/item/${swap.receiverItem.id}`}
                                                    className="flex items-center gap-2 text-sm hover:underline"
                                                >
                                                    <img
                                                        src={swap.receiverItem.image}
                                                        alt={swap.receiverItem.title}
                                                        className="w-7 h-7 object-cover rounded"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium leading-none">{swap.receiverItem.title}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end justify-between gap-2 w-full sm:w-[130px] text-right">
                                            <div className="flex items-center gap-2">
                                                <div className="text-xs text-right">
                                                    <p className="font-medium">{swap.receiver.name}</p>
                                                    <p className="text-muted-foreground text-[10px]">you sent a swap</p>
                                                </div>
                                                <Avatar>
                                                    <AvatarImage src={swap.receiver.image || undefined} />
                                                    <AvatarFallback>
                                                        {swap.receiver.name?.charAt(0)?.toUpperCase() || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>

                                            {renderStatusBadge(swap.status)}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="bg-muted p-3 rounded-md text-sm">
                                        <h1 className="font-medium mb-1">Your Message:</h1>
                                        <p className="text-muted-foreground">{swap?.message}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>


            </Tabs >
        </div >
    );
}

export default MySwaps;
