class HomepageController < ApplicationController
  def index
  end

  #calls iTunes Api and returns processed list of results
  def search
    render json: itunes_search_request
  end

  private 

  def itunes_search_request
    request_str = "https://itunes.apple.com/search?term=#{request.params[:q]}&entity=album"
    client_response = RestClient.get(request_str)

    response = JSON.parse client_response
  
    filtered_results = response["results"].map do |elem|
      {
        leading_thumbnail_url: elem["artworkUrl100"],
        title: elem["collectionName"],
        subtitle: elem["artistName"],
      }
    end

    filtered_results
  end
end
