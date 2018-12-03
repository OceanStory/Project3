Rails.application.routes.draw do
  resources :posts, :dialogues, :items
  devise_for :admins
  resource :pages do
    member do
      get "home"
    end
    get "start"
  end
  root "pages#start"
end
