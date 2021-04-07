# CORS

Running the survey locally and having the PHP script
on your server will likely not work due to
[Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
(or "CORS") limitations. It is a security risk making a network request
from your local machine to a remote server.

Sometimes, you need to be able to test your survey locally, and make constant changes,
before publishing it for good. You can turn off CORS by editing `/public/submit.php`
before you run `npm run build` (or `/submit.php` in your `homepage` folder
_after_ you have built and deployed the survey) and uncommenting the `header` line of code.
See `submit.php` for more details.

Note that this is a security risk, and should only be used for testing.
The code that allows CORS should be left commented when testing is complete.
