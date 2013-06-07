class UsersController < ApplicationController
	require "csv"

	def show
	end


	def import

	end

	def create
		if params[:file].present?
			file_data=params[:file].path
			@values=[]
			CSV.foreach(file_data) do |item|
				@values << item
		  end
    end	
    render action: :show , :locals => {:values => @values}
	end


end
