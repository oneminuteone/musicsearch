class Api::V1::FavouritesController < ApplicationController  
  # shows all favourite itunes musics
  def index
    render json: {
      favourites: Favourite.all
    }
  end

  # creates new favourite itunes music
  def create
    if Favourite.exists?(favourite_params)
      render json: {
        message: "This album was already added to the favourites list",
        status: "error"
      }
    else
      Favourite.create!(favourite_params)

      render json: {
        message: "successfully added album to the favourites list",
        status: "success"
      }
    end
  end

   # removes favourite itunes music
  def destroy
    favourite = Favourite.find(params[:id])
    album_name = favourite.title

    favourite.destroy

    render json: {
      message: "successfully deleted album #{album_name} from the favourites list"
    }    
  end

  private

  def favourite_params
    params.require(:favourite).permit(:leading_thumbnail_url, :title, :subtitle)
  end
end
