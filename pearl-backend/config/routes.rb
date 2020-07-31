Rails.application.routes.draw do
  resources :completeds
  resources :inprogresses
  resources :pending
  resources :profiles, only: [ :index, :create,:show,:destroy,:update]
  resources :tasks
  resources :users, only: [ :index,:new, :create,:destroy,:update]

  
  post '/login', to: "login#create"
  
  get '/profile', to: "users#show"

  post '/newTask', to: "tasks#create"

  # patch '/editTask', to: "tasks#update"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
