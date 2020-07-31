require 'test_helper'

class InprogressesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @inprogress = inprogresses(:one)
  end

  test "should get index" do
    get inprogresses_url, as: :json
    assert_response :success
  end

  test "should create inprogress" do
    assert_difference('Inprogress.count') do
      post inprogresses_url, params: { inprogress: { senior_id: @inprogress.senior_id, task_id: @inprogress.task_id, volunteer_id: @inprogress.volunteer_id } }, as: :json
    end

    assert_response 201
  end

  test "should show inprogress" do
    get inprogress_url(@inprogress), as: :json
    assert_response :success
  end

  test "should update inprogress" do
    patch inprogress_url(@inprogress), params: { inprogress: { senior_id: @inprogress.senior_id, task_id: @inprogress.task_id, volunteer_id: @inprogress.volunteer_id } }, as: :json
    assert_response 200
  end

  test "should destroy inprogress" do
    assert_difference('Inprogress.count', -1) do
      delete inprogress_url(@inprogress), as: :json
    end

    assert_response 204
  end
end
