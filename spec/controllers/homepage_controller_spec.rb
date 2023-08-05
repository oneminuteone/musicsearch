require "rails_helper"

RSpec.describe HomepageController, type: :controller do
  let(:q) { "Linkin Park"}
  let(:url) { "some_url"}
  let(:title) { "album name"}
  let(:subtitle) { "band name"}
  let(:request_str) do 
    "https://itunes.apple.com/search?term=#{q}&entity=album" 
  end

  let(:mocked_itunes_response) {
    {
        results: [
            {
                artworkUrl100: url,
                collectionName: title,
                artistName: subtitle
            },
            {
                artworkUrl100: "#{url}2",
                collectionName: "#{title}2",
                artistName: "#{subtitle}2"
            }
        ]
    }.to_json
  }
  
  describe "GET search" do

    before do
        allow(RestClient).to receive(:get).
        with(request_str).
        and_return(mocked_itunes_response)
    end

    it "returns a 200" do
      get :search, params: { q: }

      response_body = JSON.parse(response.body, {symbolize_names: true })

      expect(response_body).to eq(
        [
            {
                leading_thumbnail_url: url,
                title:,
                subtitle: 
            },
            {
                leading_thumbnail_url: "#{url}2",
                title: "#{title}2",
                subtitle:  "#{subtitle}2"
            },            
        ]
      )

      expect(response).to have_http_status(:ok)
    end
  end
end
