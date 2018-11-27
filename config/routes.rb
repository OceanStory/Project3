Rails.application.routes.draw do
  get 'dialogues/index'
  get 'dialogues/show'
  get 'dialogues/new'
  get 'dialogues/edit'
  get 'items/index'
  get 'items/show'
  get 'items/new'
  get 'items/edit'
  get 'posts/index'
  get 'posts/show'
  get 'posts/new'
  get 'posts/edit'
  devise_for :admins
  root "pages#home"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
