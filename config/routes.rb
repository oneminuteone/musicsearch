Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'favourites', to: 'favourites#index'
      post 'favourites/create'
      delete 'favourites/destroy/:id', to: 'favourites#destroy'
    end
  end
  root 'homepage#index'

  get 'api/v1/search', to: 'homepage#search'
  get '/*path' => 'homepage#index'
end
