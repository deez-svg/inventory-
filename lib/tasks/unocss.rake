namespace :unocss do
  task dev: :environment do
    run_unocss("-w")
  end

  task build: :environment do
    run_unocss("-m")
  end

  def run_unocss(extra_args = "")
    system(
      "unocss",
      "app/views/**/*.html.erb",
      "-c", "./uno.config.ts",
      "-o", "app/assets/stylesheets/uno.css",
      extra_args
    )
  end
end

Rake::Task["assets:precompile"].enhance([ "unocss:build" ])
