class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :must_see, :visited
  belongs_to :country
end
