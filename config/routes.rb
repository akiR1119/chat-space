Rails.application.routes.draw do
  devise_for :users , controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'groups#index'
  resources :users, only: [:index,:edit, :update]
  resources :groups, only: [:new, :edit, :create, :update] do
    resources :messages, only: [:index, :create]
  end
  # devise_for :users, controllers: {
  #   registrations: 'users/registrations',
  #   sessions: "users/sessions",
  # }
end
