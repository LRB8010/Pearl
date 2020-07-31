require 'test_helper'

class PendingTasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pending_task = pending_tasks(:one)
  end

  test "should get index" do
    get pending_tasks_url, as: :json
    assert_response :success
  end

  test "should create pending_task" do
    assert_difference('PendingTask.count') do
      post pending_tasks_url, params: { pending_task: { task_id: @pending_task.task_id, user_id: @pending_task.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show pending_task" do
    get pending_task_url(@pending_task), as: :json
    assert_response :success
  end

  test "should update pending_task" do
    patch pending_task_url(@pending_task), params: { pending_task: { task_id: @pending_task.task_id, user_id: @pending_task.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy pending_task" do
    assert_difference('PendingTask.count', -1) do
      delete pending_task_url(@pending_task), as: :json
    end

    assert_response 204
  end
end
