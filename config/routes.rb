Rails.application.routes.draw do
  resources :posts, :dialogues, :items
  devise_for :admins
  root "pages#home"
end
