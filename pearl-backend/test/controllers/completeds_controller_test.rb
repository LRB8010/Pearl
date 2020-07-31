require 'test_helper'

class CompletedsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @completed = completeds(:one)
  end

  test "should get index" do
    get completeds_url, as: :json
    assert_response :success
  end

  test "should create completed" do
    assert_difference('Completed.count') do
      post completeds_url, params: { completed: { senior_id: @completed.senior_id, task_id: @completed.task_id, volunteer_id: @completed.volunteer_id } }, as: :json
    end

    assert_response 201
  end

  test "should show completed" do
    get completed_url(@completed), as: :json
    assert_response :success
  end

  test "should update completed" do
    patch completed_url(@completed), params: { completed: { senior_id: @completed.senior_id, task_id: @completed.task_id, volunteer_id: @completed.volunteer_id } }, as: :json
    assert_response 200
  end

  test "should destroy completed" do
    assert_difference('Completed.count', -1) do
      delete completed_url(@completed), as: :json
    end

    assert_response 204
  end
end
