module ApplicationHelper
  def show_items
    @items = Item.all
  end
end
