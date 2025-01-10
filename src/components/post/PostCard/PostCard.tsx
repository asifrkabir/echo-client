"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProcesssVote } from "@/hooks/vote.hook";
import { IApiResponse, IPost, IUser } from "@/types";
import httpStatus from "http-status";
import {
  CircleUser,
  Eye,
  SquareChevronDown,
  SquareChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import PaymentModal from "../../payment/PaymentModal";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import UpdatePostModal from "../UpdatePost/UpdatePostModal";
import styles from "./PostCard.module.css";
import { DeletePostModal } from "../DeletePost/DeletePostModal";

interface IProps {
  post: IPost;
  loggedInUser?: IUser;
}

const PostCard = ({ post, loggedInUser }: IProps) => {
  const { mutate: handleProcessVote, isPending: processVotePending } =
    useProcesssVote();
  // const queryClient = useQueryClient();

  const maxContentLength = 1000;
  const maxPreviewLength = 100;
  const maxImagesToShow = 4;

  const handleVoteClick = (voteType: "upvote" | "downvote") => {
    if (voteType === "upvote") {
      if (post.voteType === "upvote") {
        post.upvotes -= 1;
        post.voteType = "none";
      } else if (post.voteType === "downvote") {
        post.upvotes += 1;
        post.downvotes -= 1;
        post.voteType = "upvote";
      } else {
        post.upvotes += 1;
        post.voteType = "upvote";
      }
    } else if (voteType === "downvote") {
      if (post.voteType === "downvote") {
        post.downvotes -= 1;
        post.voteType = "none";
      } else if (post.voteType === "upvote") {
        post.downvotes += 1;
        post.upvotes -= 1;
        post.voteType = "downvote";
      } else {
        post.downvotes += 1;
        post.voteType = "downvote";
      }
    }

    const voteData = {
      post: post._id,
      voteType,
    };

    handleProcessVote(voteData, {
      onSuccess: (res: IApiResponse<{ message: string }>) => {
        if (res.statusCode === httpStatus.OK) {
          // queryClient.invalidateQueries({ queryKey: ["ALL_POSTS_NEWSFEED"] });
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(error.message || "Voting failed. Please try again.");
      },
    });
  };

  return (
    <Card className="relative flex flex-col rounded-lg border w-full h-auto transition-shadow hover:shadow-md">
      {/* Header - Author Info */}
      <CardHeader className="flex flex-row justify-between items-center p-4">
        <Link href={`/user-dashboard/profile/${post.author._id!.toString()}`}>
          <div className="flex flex-row items-center">
            {post.author?.profilePicture ? (
              <Image
                src={post.author.profilePicture}
                alt={post.author.name!}
                width={40}
                height={40}
                className="rounded-full border-2 border-yellow-500"
              />
            ) : (
              <CircleUser className="h-10 w-10 text-gray-400" />
            )}
            <div className="ml-3">
              <p className="font-bold text-default">{post.author?.name}</p>
              <p className="text-sm text-default text-muted-foreground">
                Posted on: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Link>

        <div className="flex-grow" />

        {loggedInUser && loggedInUser.userId === post.author._id && (
          <div className="flex flex-row items-center">
            <UpdatePostModal post={post} />
            <DeletePostModal post={post} />
          </div>
        )}

        {post.isPremium && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="absolute -top-2 -right-2 bg-[#059669] text-white flex items-center">
                  <span className="size-4">$</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Premium Post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>

      {/* Body - Image and Content Preview */}
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-8">{post.title}</h2>

        {/* Image Grid */}
        {post.imageUrls && post.imageUrls.length > 0 && (
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 mb-8">
            {post.imageUrls.slice(0, maxImagesToShow).map((imageUrl, index) => (
              <div key={index} className="relative overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`Post image ${index + 1}`}
                  width={1920}
                  height={150}
                  className={`${
                    !post.isPurchased ? "blur-sm" : ""
                  } object-cover transition duration-300 rounded-sm`}
                />
                {/* Overlay if more images */}
                {index === maxImagesToShow - 1 &&
                  post.imageUrls!.length > maxImagesToShow && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold">
                      +{post.imageUrls!.length - maxImagesToShow}
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}

        {/* Content Preview */}
        <div className="text-sm text-default mb-4">
          <div
            className={styles.richText}
            dangerouslySetInnerHTML={{
              __html: post.isPurchased
                ? post.content.slice(0, maxContentLength)
                : post.content.slice(0, maxPreviewLength),
            }}
          />
          {post.isPurchased && post.content.length > maxContentLength && (
            <Link href={`/user-dashboard/news-feed/${post._id}`}>
              <span className="text-emerald-600 cursor-pointer hover:underline">
                ...Read more
              </span>
            </Link>
          )}
          {!post.isPurchased && post.content.length > maxPreviewLength && (
            <span className="text-emerald-600 cursor-pointer">
              ...Purchase to read more
            </span>
          )}
        </div>

        {post.category && (
          <Badge
            className={`${
              post.category === "story" ? "bg-blue-500" : "bg-emerald-500"
            } text-md`}
          >
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </Badge>
        )}
      </CardContent>

      {/* Footer - Action Buttons */}
      <CardFooter className="flex items-center p-4 border-t">
        {!post.isPurchased ? (
          <PaymentModal post={post} />
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center space-x-4 h-5">
              <button
                className={`flex items-center ${
                  post.voteType === "upvote"
                    ? "text-emerald-600"
                    : "text-gray-600"
                } hover:text-emerald-600`}
                onClick={() => handleVoteClick("upvote")}
                disabled={processVotePending}
              >
                <SquareChevronUp
                  className={`h-5 w-5 ${
                    post.voteType === "upvote" ? "text-emerald-600" : ""
                  }`}
                />
                <span className="ml-1">{post.upvotes}</span>
              </button>

              <Separator orientation="vertical" />

              <button
                className={`flex items-center ${
                  post.voteType === "downvote"
                    ? "text-red-600"
                    : "text-gray-600"
                } hover:text-red-600`}
                onClick={() => handleVoteClick("downvote")}
                disabled={processVotePending}
              >
                <SquareChevronDown
                  className={`h-5 w-5 ${
                    post.voteType === "downvote" ? "text-red-600" : ""
                  }`}
                />
                <span className="ml-1">{post.downvotes}</span>
              </button>
            </div>
            <div>
              <Link href={`/user-dashboard/news-feed/${post._id}`}>
                <Button size={"sm"}>
                  <Eye className="mr-1" /> View Details
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
