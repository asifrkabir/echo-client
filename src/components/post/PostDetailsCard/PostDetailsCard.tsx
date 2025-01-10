"use client";

import CommentsContainer from "@/components/comment/CommentsContainer";
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
import { IApiResponse, IPost } from "@/types";
import httpStatus from "http-status";
import { CircleUser, SquareChevronDown, SquareChevronUp } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import PaymentModal from "../../payment/PaymentModal";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import styles from "./PostDetailsCard.module.css";
import Link from "next/link";

interface IProps {
  post: IPost;
}

const PostDetailsCard = ({ post }: IProps) => {
  const { mutate: handleProcessVote, isPending: processVotePending } =
    useProcesssVote();
  // const queryClient = useQueryClient();

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
        toast.error(error.message || "Login failed. Please try again.");
      },
    });
  };

  if (!post.isPurchased) {
    return (
      <Card className="flex flex-col justify-center items-center rounded-lg border w-full h-auto p-8">
        <p className="text-lg font-semibold text-center mb-4">
          Purchase this post to unlock the full content.
        </p>
        <PaymentModal post={post} />
      </Card>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Card className="relative flex flex-col rounded-lg border w-full h-auto">
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

        {/* Body - Image and Full Content */}
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-8">{post.title}</h2>

          {/* Image Grid */}
          {post.imageUrls && post.imageUrls.length > 0 && (
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 mb-8">
              {post.imageUrls.map((imageUrl, index) => (
                <div key={index} className="relative overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`Post image ${index + 1}`}
                    width={800}
                    height={150}
                    className={`${
                      !post.isPurchased ? "blur-sm" : ""
                    } object-cover transition duration-300 rounded-sm`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Full Content */}
          <div className="text-sm text-default mb-4">
            <div
              className={styles.richText}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
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
        <CardFooter className="flex items-center justify-center p-4 border-t">
          {!post.isPurchased ? (
            <Button
              size={"sm"}
              className="px-4 py-2 rounded-lg ml-auto bg-emerald-600"
            >
              Purchase
            </Button>
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
            </div>
          )}
        </CardFooter>
      </Card>

      <CommentsContainer postId={post._id} />
    </div>
  );
};

export default PostDetailsCard;
