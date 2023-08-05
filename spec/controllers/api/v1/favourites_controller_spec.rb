require "rails_helper"

RSpec.describe Api::V1::FavouritesController, type: :controller do
  let!(:favourite_1) { FactoryBot.create(:favourite) }
  
  describe "GET index" do
    let!(:favourite_2) { FactoryBot.create(:favourite) }
    
    it "returns a 200" do
      get :index

      response_body = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)

      expect(response_body["favourites"][0]).to eq(favourite_1.attributes.except("updated_at", "created_at"))
      expect(response_body["favourites"][1]).to eq(favourite_2.attributes.except("updated_at", "created_at"))
    end
  end

  describe "POST create" do
    context "When Favourite information is added for the first time" do
      it "creates the Favourite record" do
        expect { 
          post :create, params: {
            favourite: {
                leading_thumbnail_url: "some url",
                title: "some title",
                subtitle: "some subtitle",
            }
          }
        }.to change(Favourite, :count).by(1)
      
        response_body = JSON.parse(response.body)
    
        expect(response).to have_http_status(:ok)
        expect(response_body["message"]).to eq("successfully added album to the favourites list")
        expect(response_body["status"]).to eq("success")
      end
    end

    context "When Favourite information is added for the nth time" do
      it "does not create the Favourite record" do
        expect { 
          post :create, params: {
            favourite: {
                leading_thumbnail_url: favourite_1.leading_thumbnail_url,
                title: favourite_1.title,
                subtitle: favourite_1.subtitle,
            }
          }
        }.not_to change(Favourite, :count)
      
        response_body = JSON.parse(response.body)
        
        expect(response).to have_http_status(:ok)
        expect(response_body["message"]).to eq("This album was already added to the favourites list")
        expect(response_body["status"]).to eq("error")
      end
    end

  end

  describe "DELETE destroy" do    
    it "removes Favourite" do
      expect {
        delete :destroy, params: { id: favourite_1.id }
      }.to change(Favourite, :count).by(-1)

      response_body = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)

      expect(response_body["message"]).to eq("successfully deleted album #{favourite_1.title} from the favourites list")
    end
  end
end
