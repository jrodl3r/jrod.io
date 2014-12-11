http_path = "/"
css_dir = "css"
sass_dir = "css"
images_dir = "img"
javascripts_dir = "js"

# Enviroment & Output Settings (environment :production || :development)
environment = :development
output_style = (environment == :production) ? :compressed : :expanded
sass_options = (environment == :production) ? {:debug_info => false} : {:debug_info => true}

relative_assets = true
color_output = false


# Custom Sass Functionality (Inline SVG Images)
require 'sass'
require 'cgi'

module Sass::Script::Functions

  def inline_svg_image(path)
    real_path = File.join(Compass.configuration.images_path, path.value)
    svg = data(real_path)
    encoded_svg = CGI::escape(svg).gsub('+', '%20')
    data_url = "url('data:image/svg+xml;charset=utf-8," + encoded_svg + "')"
    Sass::Script::String.new(data_url)
  end

  private

  def data(real_path)
    if File.readable?(real_path)
      File.open(real_path, "rb") {|io| io.read}
    else
      raise Compass::Error, "File not found or cannot be read: #{real_path}"
    end
  end

end
