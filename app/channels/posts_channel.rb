class PostsChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    post = Post.find(params[:post])
    stream_for post
  end

  def received(data)
    PostsChannel.broadcast_to(post, post.bids)
  end

  def unsubscribed
    stop_all_streams
  end
end
