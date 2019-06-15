/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const vision = require('@google-cloud/vision');

require('firebase/database');


exports.reviewMood = functions.storage.object().onFinalize(async (object) => {
  // Check the image content using the Cloud Vision API.
  const client = new vision.ImageAnnotatorClient();

  const results = await client.faceDetection(`gs://${object.bucket}/${object.name}`);
  const faces = results[0].faceAnnotations;

  const numFaces = faces.length;
  console.log(`Found ${numFaces} face${numFaces === 1 ? '' : 's'}.`);

  console.log('Face detection on image', faces);

  var message = "No expression detected!"
  console.log(`Joy: ${faces[0].joyLikelihood}`);
  if(faces[0].joyLikelihood === 'VERY_LIKELY') message = "New Review: Joy :) 5 stars"
  else  if(faces[0].sorrowLikelihood === 'VERY_LIKELY') message = "New Review: Sorrow :/ 2 stars"
  else  if(faces[0].angerLikelihood === 'VERY_LIKELY') message = "New Review: Anger Dx 1 star"
  else  if(faces[0]. surpriseLikelihood === 'VERY_LIKELY') message = "New Review: Surprise : 4 stars"


  admin.database().ref('messages').push({
    text: message,
    userId: "AI",
    createdAt: admin.database.ServerValue.TIMESTAMP,
  });
  return null;
});
