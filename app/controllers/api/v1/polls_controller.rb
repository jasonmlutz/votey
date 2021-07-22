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
      render json: build_catalog(@poll)
    else
      render json: @poll.errors
    end
  end

  private
    def set_poll
      @poll = Poll.find(params[:id])
    end

    def build_catalog(poll)
      catalog = {}
      catalog[:POLL] = poll
      catalog[:AUTHOR] = poll.author
      catalog[:QUESTIONS] = poll.questions
      catalog[:RESPONSE_OPTIONS] = {}
      poll.questions.each do |question|
        response_options = question.response_options
        catalog[:RESPONSE_OPTIONS][question.id] = response_options
      end

      return catalog
    end

end
