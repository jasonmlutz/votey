class Api::V1::PollsController < ApplicationController
  before_action :set_poll, only: [:show]

  # GET /polls
  # GET /polls.json
  def index
    @polls = Poll.all.order(title: :asc)
    render json: @polls
  end

  # GET /polls/1
  # GET /polls/1.json
  def show
    if @poll
      render json: @poll
    else
      render json: @poll.errors
    end
  end

  private
    def set_poll
      @poll = Poll.find(params[:id])
    end

end
