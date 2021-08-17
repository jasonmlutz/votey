class Api::V2::PollsController < ApplicationController
  before_action :set_poll, only: [:show]

  def show
    if @poll
      render json: build_show_catalog(@poll)
    else
      render json: {}
    end
  end

  private
    def set_poll
      @poll = Poll.find_by(id: params[:id])
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
      catalog[:RESPONDENTS] = {}
      poll.responses.each do |response|
        respondent = response.respondent
        catalog[:RESPONDENTS][respondent.id] = response.id
      end

      return catalog
    end
end
