Rails.application.routes.draw do
<<<<<<< HEAD
  # get "dialogues/index"
  # get "dialogues/show"
  # get "dialogues/new"
  # get "dialogues/edit"
  # get 'items/index'
  # get 'items/show'
  # get 'items/new'
  # get 'items/edit'
  # get 'posts/index'
  # get 'posts/show'
  # get 'posts/new'
  # get 'posts/edit'
  resources :dialogues

=======
  resources :posts, :dialogues, :items
>>>>>>> 7759916e6715ff4554566dfcc6bb132285325658
  devise_for :admins
  root "pages#home"
end
