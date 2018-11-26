class Api::PlayersController < ApplicationController
    def index
      @players = Player.all
      render json: @players
    end
  
    def create
      player_params = params.require(:player).permit(:name, :wins, :losses)
  
      @player = Player.create(player_params)
      render json: @player
    end
  
    def show
      @player = Player.find(params[:id])
      render json: @player
    end
end
  