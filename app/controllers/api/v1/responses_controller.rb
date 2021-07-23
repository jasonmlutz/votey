class Api::V1::ResponsesController < ApplicationController
  # POST /responses
  # POST /responses.json
  def create
    @response = Response.new(response_params)

    if @response.save
      render json: @response
    else
      render json: @response.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def response_params
      params.permit(:respondent_id, :poll_id)
    end
end
