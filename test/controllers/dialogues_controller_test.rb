require 'test_helper'

class DialoguesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get dialogues_index_url
    assert_response :success
  end

  test "should get show" do
    get dialogues_show_url
    assert_response :success
  end

  test "should get new" do
    get dialogues_new_url
    assert_response :success
  end

  test "should get edit" do
    get dialogues_edit_url
    assert_response :success
  end

end
