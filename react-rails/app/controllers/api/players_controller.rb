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
    
    def update
        # currently incrementing wins but will edit in future
        @player = Player.find(params[:id])
        @player.wins += 1
        @player.save
        render json: @player
    end
end
  