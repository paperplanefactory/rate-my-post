<?php

$dir               = @$argv[1] ?: dirname(__FILE__) . '/build';
$plugin_git_name   = 'rate-my-post';
$plugin_git_folder = $dir . '/' . $plugin_git_name;

function deleteDir($path)
{
    if (PHP_OS === 'Windows') {
        exec("rd /s /q {$path}");
    } else {
        exec("rm -rf {$path}");
    }
}

chdir($dir);

if (file_exists($plugin_git_folder)) {
    deleteDir($plugin_git_folder);
}

deleteDir($plugin_git_folder . '.zip');

exec("git clone https://github.com/feedbackwp/rate-my-post.git $plugin_git_name");
echo "git clone completed." . "\n";
echo "changed directory to $plugin_git_folder" . "\n";
$chdir = chdir($plugin_git_folder);
if ( ! $chdir) {
    exit;
}

deleteDir('.git');
deleteDir('_dev');
deleteDir('build');
deleteDir('tests');
deleteDir('codekit');
@unlink('.gitignore');

echo ".git and tests folders deleted" . "\n";

exec('composer install --dev -o');
echo "composer install completed." . "\n";

deleteDir('vendor');

foreach (
    array(
        '.gitignore',
        'scoper.inc.php',
        'composer.json',
        'package.json',
        'README.md',
        'plugin-build.php',
        'composer.lock',
        'package-lock.json',
        'config.codekit3',
        'rate-my-post.zip',
    ) as $file
) {
    @unlink($file);
}

//exec("makepot ../" . $plugin_git_name);
exec("wp i18n make-pot ../" . $plugin_git_name . " languages/rate-my-post.pot");

// move up directory
chdir($dir);
echo "Archiving file" . "\n";
exec("7z a rate-my-post.zip rate-my-post/");
echo "Zip archiving completed" . "\n";
deleteDir($plugin_git_name);

