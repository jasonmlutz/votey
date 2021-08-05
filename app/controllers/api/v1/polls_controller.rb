class Api::V1::PollsController < ApplicationController
  before_action :set_poll, only: [:show]

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
      render json: @poll.errors
    end
  end

  private
    def set_poll
      @poll = Poll.find(params[:id])
    end

    def build_index_catalog
      catalog = []
      polls = Poll.all
      polls.each do |poll|
        author = poll.author
        count = poll.responses.count
        catalog << [poll, author, count]
      end

      return catalog
    end

    def build_show_catalog(poll)
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
