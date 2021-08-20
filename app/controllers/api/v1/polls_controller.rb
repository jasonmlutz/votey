class Api::V1::PollsController < ApplicationController
  before_action :set_poll, only: [:show, :destroy]

  # GET /polls
  # GET /polls.json
  def index
    # @polls = Poll.all.order(title: :asc)
    # render json: @polls
    render json: build_index_catalog
  end

  # GET /polls/1
  # GET /polls/1.json
  def show
    if @poll
      render json: build_show_catalog(@poll)
    else
      render json: {}
    end
  end

  # POST /polls
  def create
    @poll = Poll.new(poll_params)

    if @poll.save
      render json: @poll
    else
      render json: @poll.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /polls/:poll_id
  def destroy
    if @poll && @poll.destroy
      render json: {message: "poll deleted"}
    else
      render json: {message: "unable to destroy poll"}
    end
  end

  private
    def poll_params
      params.permit(:title, :description, :author_id)
    end

    def set_poll
      @poll = Poll.find_by(id: params[:id])
    end

    def build_index_catalog
      catalog = []
      polls = Poll.all
      polls.each do |poll|
        poll_data = {
          "AUTHOR": poll.author.protect,
          "POLL": poll,
          "COUNT": poll.responses.count
        }
        catalog << poll_data
      end

      return catalog
    end

    def build_show_catalog(poll)
      catalog = {}
      catalog[:POLL] = poll
      catalog[:AUTHOR] = poll.author.protect
      catalog[:QUESTIONS] = poll.questions
      catalog[:RESPONSE_OPTIONS] = {}
      poll.questions.each do |question|
        response_options = question.response_options
        catalog[:RESPONSE_OPTIONS][question.id] = response_options
      end

      return catalog
    end

end
