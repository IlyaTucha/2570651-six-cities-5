import { useAppDispatch } from '@hooks/index';
import { sendReviewAction } from '@store/api-actions';
import { ReviewFormData } from '@typings/review-form-data';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ReviewSendingForm(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<ReviewFormData>({
    review: '',
    rating: 0
  });

  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({ ...formData, [name]: name === 'rating' ? Number(value) : value });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!id) {
      return;
    }

    const { review, rating } = formData;

    if (!rating || review.length < 50) {
      return;
    }

    setIsSubmitting(true);

    dispatch(sendReviewAction({ review: { review: review, rating }, id }))
      .unwrap()
      .then(() => setFormData({ review: '', rating: 0 }))
      .catch(() => setErrorMessage('Failed to submit review. Please try again.'))
      .finally(() => setIsSubmitting(false));
  };

  function renderRatingInput(value: number, title: string) {
    return (
      <>
        <input className="form__rating-input visually-hidden" checked={formData.rating === value} onChange={handleFieldChange} name="rating" value={value} id={`${value}-stars`} type="radio" />
        <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </>
    );
  }

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {renderRatingInput(5, 'perfect')}
        {renderRatingInput(4, 'good')}
        {renderRatingInput(3, 'not bad')}
        {renderRatingInput(2, 'badly')}
        {renderRatingInput(1, 'terribly')}
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={handleFieldChange} value={formData.review} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitting || formData.review.length < 50}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </form>
  );
}
