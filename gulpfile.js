
const gulp = require('gulp');
const git = require('gulp-git');
const replace = require('gulp-replace');
const gitignore = require('gulp-gitignore');
const argv = require('yargs').argv;

const version = require('./package.json').version;


const versionBump = require('log-me').bump;

const testit = versionBump(version, 'patch');

// The main gulp calls are at the very bottom of this file. Those main calls being:
// * gulp patch
// * gulp minor
// * gulp major

// Run git add with options
gulp.task('add', () => {
  return gulp.src('./*')
    .pipe(gitignore())
    .pipe(git.add());
});

// Run git commit
// src are the files to commit (or ./*)
gulp.task('commit', () => {
  return gulp.src('./*')
    .pipe(gitignore())
    .pipe(git.commit('auto commit'));
});

// Run git push
// remote is the remote repo
// branch is the remote branch to push to
gulp.task('push', () => {
  git.push('origin', 'master', (err) => {
    if (err) throw err;
  });
});



// bump up the version according to 'patch', 'minor', 'major'
gulp.task('patchBump', () => {
  console.log(testit);
  gulp.src(['./package.json'])
    .pipe(replace(`"version": "${version}"`, `"version": "${versionBump(version, 'patch')}"`))
    .pipe(gulp.dest('./'));
});

gulp.task('minorBump', () => {
  gulp.src(['./package.json'])
    .pipe(replace(`"version": "${version}"`, `"version": "${versionBump(version, 'minor')}"`))
    .pipe(gulp.dest('./'));
});

gulp.task('majorBump', () => {
  gulp.src(['./package.json'])
    .pipe(replace(`"version": "${version}"`, `"version": "${versionBump(version, 'major')}"`))
    .pipe(gulp.dest('./'));
});

// make version bumps by just calling the position bump as the flag
let bump = '';
if (argv.patch) {
  bump = 'patch';
} else if (argv.minor) {
  bump = 'minor';
} else if (argv.major) {
  bump = 'major';
}

gulp.task('default', [`${bump}Bump`, 'add', 'commit', 'push'], () => {

  const newVersion = require('./package.json').version;

  // Tag the repo with a version
  git.tag(`v${newVersion}`, `Version ${newVersion}`, (err) => {
    if (err) {
      throw err;
    }
  });
});
