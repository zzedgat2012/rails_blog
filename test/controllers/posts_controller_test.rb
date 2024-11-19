require "test_helper"

class Api::V1::PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = posts(:one)
  end

  test "should get index" do
    get api_v1_posts_url, as: :json
    assert_response :success
  end

  test "should display posts in descending order" do
    get api_v1_posts_url, as: :json
    # Assuming your response body returns posts as JSON, update this assertion as needed
    response_posts = JSON.parse(@response.body)
    assert_equal Post.order(created_at: :desc).pluck(:id), response_posts.map { |post| post["id"] }
  end

  test "should create post" do
    assert_difference("Post.count") do
      post api_v1_posts_url, params: { post: { body: "New body", title: "New title" } }, as: :json
    end

    assert_response :created
  end

  test "should show post" do
    get api_v1_post_url(@post), as: :json
    assert_response :success
  end

  test "should update post" do
    patch api_v1_post_url(@post), params: { post: { body: "Updated body", title: "Updated title" } }, as: :json
    assert_response :success
  end

  test "should destroy post" do
    assert_difference("Post.count", -1) do
      delete api_v1_post_url(@post), as: :json
    end

    assert_response :no_content
  end
end
